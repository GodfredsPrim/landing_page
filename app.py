import json
import os
from urllib import error, request as urlrequest

from flask import Flask, jsonify, render_template, request, send_file, url_for


app = Flask(__name__)


SYSTEM_PROMPT = (
    "You are the portfolio AI demo for Godfred Bio Conquest. "
    "Explain topics clearly, professionally, and in a recruiter-friendly way. "
    "Keep answers concise, practical, and easy to understand."
)


def local_explainer(topic: str) -> str:
    cleaned = topic.strip()
    lowered = cleaned.lower()

    if any(word in lowered for word in ["ai", "ml", "machine learning", "model"]):
        return (
            f"{cleaned} should be treated as a practical system, not just a model. "
            "A strong implementation starts with clear goals, reliable data, and measurable outcomes.\n\n"
            "In product work, I focus on turning AI into something usable: fast interfaces, clear outputs, "
            "and workflows that help people make better decisions."
        )

    if any(word in lowered for word in ["web", "frontend", "flask", "react", "full stack"]):
        return (
            f"{cleaned} works best when backend logic and frontend experience are designed together. "
            "The code matters, but so do speed, clarity, and maintainability.\n\n"
            "My approach is to build reliable systems and then present them through interfaces that feel sharp and professional."
        )

    if any(word in lowered for word in ["data", "analytics", "dashboard", "visualization"]):
        return (
            f"{cleaned} becomes useful when raw information turns into action. "
            "That means clean pipelines, readable metrics, and interfaces that help users spot patterns quickly.\n\n"
            "I aim for analytics tools that are easy to scan, easy to trust, and ready for real deployment."
        )

    return (
        f"{cleaned} becomes powerful when it solves a real problem clearly and efficiently. "
        "My work usually combines product thinking, engineering discipline, and polished presentation.\n\n"
        "That combination helps ideas feel both intelligent and genuinely usable."
    )


def openai_explainer(topic: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("Missing OPENAI_API_KEY")

    payload = {
        "model": os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Explain this topic: {topic}"},
        ],
        "temperature": 0.7,
        "max_tokens": 260,
    }

    req = urlrequest.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    with urlrequest.urlopen(req, timeout=20) as response:
        body = json.loads(response.read().decode("utf-8"))
        return body["choices"][0]["message"]["content"].strip()


def explain_topic(topic: str) -> tuple[str, str]:
    try:
        return openai_explainer(topic), "openai"
    except (RuntimeError, error.URLError, error.HTTPError, KeyError, TimeoutError, json.JSONDecodeError):
        return local_explainer(topic), "local"


@app.route("/")
def home():
    return render_template(
        "index.html",
        profile_image_url=url_for("profile_image"),
        profile_image_og_url=url_for("profile_image", _external=True),
    )


@app.route("/profile-image")
def profile_image():
    return send_file(os.path.join(app.static_folder, "images", "profile.jpeg"), mimetype="image/jpeg")


@app.post("/api/explain")
def api_explain():
    payload = request.get_json(silent=True) or {}
    topic = str(payload.get("topic", "")).strip()

    if not topic:
        return jsonify({"ok": False, "error": "Please enter a topic first."}), 400

    answer, source = explain_topic(topic)
    return jsonify({"ok": True, "answer": answer, "source": source})


if __name__ == "__main__":
    app.run(debug=True)


