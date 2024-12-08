FROM python
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs
EXPOSE 1257
WORKDIR /app


CMD ["python", "main.py"]