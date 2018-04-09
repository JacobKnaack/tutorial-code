import sys

GREETING_KEYWORDS = ("hello", "hi", "greetings", "hey

INTERROGATIVES = ("what", "how", )

def greet():
    print('Hey There! What can I help you with?')
    sys.stdout.flush()

def answer():
    print('I think therfor I am')
    sys.stdout.flush()

wordList = sys.argv[1].split(' ')
for word in wordList:
    if word in GREETING_KEYWORDS:
        greet()

for word in wordList:
    if word in INTERROAGATIVES:
        answer();
