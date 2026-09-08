# Godfred Bio Conquest — Portfolio

A Flask/Jinja portfolio with selected project notes, a searchable project archive, experience, education and contact details.

```sh
python -m pip install -r requirements.txt
python -m flask --app app run --port 5050
python -m unittest discover -s tests -v
```

Content lives in `content/portfolio.json`. See [UPDATING.md](UPDATING.md) for the content and image workflow, [DESIGN.md](DESIGN.md) for the visual system and [VERIFICATION.md](VERIFICATION.md) for checked behaviour and limitations.

The redesign preserves Flask, existing API/image routes and the existing PDF URL. Vercel uses `api/index.py`; the content directory is included explicitly in its build configuration. Production release requires owner approval.
