import redis

def write(redis, string: str):
    redis.set(string, string)

with redis.Redis(host='redis', port='6379') as r:
    with open('wordlist.txt', 'r') as f:
        for txt in f.readlines():
            write(r, txt.replace('\n', ''))
    r.save()