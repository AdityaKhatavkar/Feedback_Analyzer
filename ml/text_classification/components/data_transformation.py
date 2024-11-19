import os
import pandas as pd
import numpy as np
import re
import string
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle


# Dictionary of SMS-style short words and their actual forms
sms_dict = {
    "u": "you",
    "ur": "your",
    "r": "are",
    "msg": "message",
    "thx": "thanks",
    "pls": "please",
    "pls": "please",
    "btw": "by the way",
    "idk": "I don't know",
    "imo": "in my opinion",
    "brb": "be right back",
    "omg": "oh my god",
    "lol": "laughing out loud",
    "ttyl": "talk to you later",
    "l8r": "later",
    "gr8": "great",
    "b4": "before",
    "w8": "wait",
    "cya": "see you",
    "luv": "love",
    "tmrw": "tomorrow",
    "2moro": "tomorrow",
    "k": "okay",
    "fav":"favourite",
    "nite": "night",
    "y": "why",
    "abt": "about",
    "bday": "birthday",
    "bff": "best friend forever",
    "asap": "as soon as possible",
    "fyi": "for your information",
    "hbd": "happy birthday",
    "ily": "I love you",
    "jk": "just kidding",
    "np": "no problem",
    "smh": "shaking my head",
    "tbh": "to be honest",
    "btw": "by the way",
    "wbu": "what about you",
    "idc": "I don't care",
    "ppl": "people",
    "u2": "you too",
    "xoxo": "hugs and kisses",
    "b4n": "bye for now",
    "omw": "on my way",
    "g2g": "got to go",
    "ic": "I see",
    "ftw": "for the win",
    "lmk": "let me know",
    "rofl": "rolling on the floor laughing",
    "bf": "boyfriend",
    "gf": "girlfriend",
    "wyd": "what you doing",
    "smth": "something",
    "rn": "right now",
    "bc": "because",
    "bcoz":"because",
    "tho": "though",
    "ttys": "talk to you soon",
    "jk": "just kidding",
    "afaik": "as far as I know",
    "atm": "at the moment",
    "imho": "in my humble opinion",
    "ikr": "I know right",
    "b4u": "before you",
    "w/": "with",
    "w/o": "without",
    "urself": "yourself",
    "thru": "through",
    "gratz": "congratulations",
    "def": "definitely",
    "bcoz": "because",
    "yolo": "you only live once",
    "fomo": "fear of missing out",
}
def text_preprocessing(text):
    # Convert non-string values to empty strings
    if not isinstance(text, str):
        text = ''

    # Remove HTML tags
    pattern = re.compile('<.*?>')
    text = pattern.sub(r'', text)
    
    # Remove URLs
    temp = re.compile(r'https?://\S+|www\.\S+')
    text = temp.sub('', text)
    
    # Lowercase the text
    text = text.lower()
    
    # Remove punctuations
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text)

    # Replace SMS words with full forms
    for word in text.split():
        if word in sms_dict:
            text = text.replace(word, sms_dict[word])

    # Tokenize text
    text = word_tokenize(text)

    # Remove stopwords
    stopwords_to_remove = stopwords.words('english')
    text = [word for word in text if word not in stopwords_to_remove]

    # Lemmatization
    lemmatizer = WordNetLemmatizer()
    text = ' '.join([lemmatizer.lemmatize(word) for word in text])

    return text

def text_vectorization(X):
    tv = TfidfVectorizer( max_features=5000)
    X_tv = pd.DataFrame(tv.fit_transform(X).toarray())

    if not os.path.exists('artifacts'):
        os.makedirs('artifacts')

    with open('artifacts/vectorizer.pkl','wb') as f:
         pickle.dump((tv), f)

    return X_tv


def data_preprocessing(Dataset_file_path):
    
    df = pd.read_csv(Dataset_file_path)
    '''
    df['review']=df['review'].apply(text_preprocessing)
    '''

    # Initialize an empty list to store processed chunks
    chunks = []
    # Process the dataframe in chunks of 10,000 rows
    chunk_size = 10000
    for start in range(0, len(df), chunk_size):
        end = start + chunk_size
        chunk = df.iloc[start:end].copy()  # Copy the chunk to avoid modifying the original dataframe
        chunk['Review'] = chunk['Review'].apply(text_preprocessing)
        chunks.append(chunk)

    # Concatenate the processed chunks back into a single dataframe
    df= pd.concat(chunks, ignore_index=True)
    # Now df contains the preprocessed reviews

    if not os.path.exists('artifacts'):
        os.makedirs('artifacts')
    

    current_dir = os.path.dirname(__file__)
    artifacts_path = os.path.join(current_dir, 'artifacts')
    os.makedirs(artifacts_path, exist_ok=True)

    with open('artifacts/preprocessing.pkl','wb')as f:
            pickle.dump((text_preprocessing),f)

    
    X = df['Review']
    y = df['Sentiment']

    le = LabelEncoder()
    y = le.fit_transform(y)
    return X,y
