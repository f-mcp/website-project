"""
Web Server Gateway Interface for new_game
"""

# Imports
import sys
import os

# App directory
sys.path.insert(0, '/home/u948526563/domains/escapethenet.co.uk/public_html/app.py')

# Set environment variables
os.environ['FLASK_APP'] = 'app.py'

# Import the flask app
from app import app as application
