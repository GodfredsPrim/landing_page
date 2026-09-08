import json
import unittest
from pathlib import Path
from unittest.mock import patch

from app import app, portfolio_content


class PortfolioTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_home_renders_evidence_without_script_dependency(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)
        for text in ['BroxStudies', 'Codveda Technologies', 'SOLVXIT-GH', 'grateful to God', '1b78d234']:
            self.assertIn(text, html)
        for obsolete in ['cdn.tailwindcss.com', 'gsap', 'x-data=', 'visitor-count', 'skill-bar']:
            self.assertNotIn(obsolete, html)

    def test_archive_combines_search_and_category(self):
        html = self.client.get('/projects?q=Python&category=Learning').get_data(as_text=True)
        self.assertIn('Age &amp; expression detection', html)
        self.assertNotIn('id="job-match-ghana"', html)

    def test_empty_search_and_escaped_query(self):
        html = self.client.get('/projects?q=<script>alert(1)</script>').get_data(as_text=True)
        self.assertIn('No matching projects.', html)
        self.assertNotIn('<script>alert(1)</script>', html)

    def test_unknown_category_recovers_all_projects(self):
        html = self.client.get('/projects?category=unknown').get_data(as_text=True)
        self.assertEqual(html.count('class="archive-row"'), len(portfolio_content()['projects']))

    def test_content_assets_and_unique_slugs(self):
        projects = portfolio_content()['projects']
        self.assertEqual(len({p['slug'] for p in projects}), len(projects))
        for project in projects:
            if project.get('featured'):
                for key in ['role', 'problem', 'contribution', 'built', 'decision', 'outcome', 'image_alt', 'caption']:
                    self.assertTrue(project[key])
                self.assertTrue((Path(app.static_folder) / project['image']).is_file())
            if project.get('source'):
                self.assertTrue(project['source'].startswith('https://github.com/GodfredsPrim/'))

    def test_existing_download_and_image_routes(self):
        for route, mime in [('/profile-image','image/jpeg'),('/static/Godfred_Bio_Conquest_Resume.pdf','application/pdf'),('/static/favicon.svg','image/svg+xml'),('/static/images/social-preview.jpg','image/jpeg')]:
            response = self.client.get(route)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.mimetype, mime)
            response.close()

    def test_explainer_rejects_invalid_payloads(self):
        for payload in [[], ['x'], {}, {'topic': ''}, {'topic':'x'*501}]:
            self.assertEqual(self.client.post('/api/explain',json=payload).status_code, 400)

    @patch('app.openai_explainer', side_effect=RuntimeError('No key'))
    def test_existing_explainer_local_fallback(self, mock):
        response = self.client.post('/api/explain',json={'topic':'machine learning'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['source'], 'local')
        self.assertTrue(response.json['answer'])

    def test_deployment_includes_content(self):
        config=json.loads(Path('vercel.json').read_text())
        self.assertIn('content/**',config['builds'][0]['config']['includeFiles'])


if __name__ == '__main__':
    unittest.main()
