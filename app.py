"""
Let's make a new game
"""

import os
from flask import Flask, render_template, request, redirect, url_for
from answers import answer_store

app = Flask(__name__)

app.config['SECRET_KEY'] = os.urandom(24)  # Use a fixed key for production
app.config['DEBUG'] = False

def get_sidebar_questions():
    """
    Generates the list of questions to show in the sidebar:
    - All correctly answered questions.
    - The first incomplete question (latest progress).
    """
    completed = [level for level, data in answer_store.items() if data[1] == 1]
    first_incomplete = next((level for level, data in answer_store.items() if data[1] == 0), None)

    # Include the first incomplete question, if it exists
    if first_incomplete:
        completed.append(first_incomplete)

    return completed


@app.route('/<int:level>', methods=['GET', 'POST'])
def level(level):
    """ Main function to render levels """
    if level not in answer_store:
        return render_template('error.html', message="this level does not exist.")

    # Determine the latest unlocked level
    completed_levels = [lvl for lvl, data in answer_store.items() if data[1] == 1]
    first_incomplete = next((lvl for lvl, data in answer_store.items() if data[1] == 0), None)

    # The latest unlocked level is either the highest completed level or the first incomplete level
    latest_unlocked = max(completed_levels) if first_incomplete is None else first_incomplete

    # If the user tries to access a locked level, redirect them to the latest unlocked level
    if level > latest_unlocked:
        return redirect(url_for('level', level=latest_unlocked))

    # Process form submission
    if request.method == 'POST':
        user_answer = request.form.get('answer', '').strip().lower()
        correct_answer, is_correct = answer_store[level]

        if user_answer == correct_answer.lower():
            answer_store[level][1] = 1  # Mark the question as answered correctly
            return redirect(url_for('level', level=level + 1))

        return render_template('error.html', message="wrong. try harder.")

    # Render the level page with the sidebar questions
    sidebar_questions = get_sidebar_questions()
    return render_template(f'{level}.html', level=level, sidebar_questions=sidebar_questions)


@app.route('/')
def home():
    """ We don't really need a home page for this, so let's just send them to Q1 """
    return redirect(url_for('level', level=1))

@app.route('/qr')
def qr_route():
    """ A specific route for one question """
    return render_template('qr.html')

if __name__ == '__main__':
    app.run()
