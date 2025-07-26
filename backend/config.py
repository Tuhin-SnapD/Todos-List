# Email Configuration
# Update these settings with your email credentials

EMAIL_CONFIG = {
    'MAIL_SERVER': 'smtp.gmail.com',
    'MAIL_PORT': 587,
    'MAIL_USE_TLS': True,
    'MAIL_USERNAME': 'XXX@gmail.com',
    'MAIL_PASSWORD': 'XXX'
}

# Instructions for setting up Gmail:
# 1. Enable 2-factor authentication on your Gmail account
# 2. Generate an App Password:
#    - Go to Google Account settings
#    - Security > 2-Step Verification > App passwords
#    - Generate a new app password for "Mail"
# 3. Use that app password in MAIL_PASSWORD above

# Alternative email providers:
# For Outlook/Hotmail:
# MAIL_SERVER = 'smtp-mail.outlook.com'
# MAIL_PORT = 587

# For Yahoo:
# MAIL_SERVER = 'smtp.mail.yahoo.com'
# MAIL_PORT = 587

# For custom SMTP:
# MAIL_SERVER = 'your-smtp-server.com'
# MAIL_PORT = 587  # or 465 for SSL 