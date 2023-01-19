FROM python:alpine3.11

ENV VIRTUAL_ENV=/.venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY wordlist.txt .
COPY db_filler.py .

CMD [ "python3", "db_filler.py" ]