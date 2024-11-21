import os
import pandas as pd
import re
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
from sklearn.preprocessing import LabelEncoder

# Function for text preprocessing
def text_preprocessing(text):
    if not isinstance(text, str):
        text = ''
    text = re.sub('<.*?>', '', text)  # Remove HTML tags
    text = re.sub(r'https?://\S+|www\.\S+', '', text)  # Remove URLs
    text = text.lower().translate(str.maketrans('', '', string.punctuation))  # Lowercase and remove punctuation
    text = re.sub(r'\s+', ' ', text)  # Remove extra spaces
    text = word_tokenize(text)
    text = [word for word in text if word not in stopwords.words('english')]
    lemmatizer = WordNetLemmatizer()
    text = ' '.join([lemmatizer.lemmatize(word) for word in text])
    return text

# Load the dataset and preprocess it
def data_preprocessing(file_path):
    df = pd.read_csv(file_path)
    df['Review'] = df['Review'].apply(text_preprocessing)

    # Define a pipeline for vectorization
    pipeline = Pipeline([
        ('vectorizer', TfidfVectorizer(max_features=5000)),
    ])

    X = pipeline.fit_transform(df['Review'])
    y = df['Sentiment']
    
   

    # Save the preprocessing pipeline
    os.makedirs('artifacts', exist_ok=True)
    with open('artifacts/preprocessing.pkl', 'wb') as f:
        pickle.dump(pipeline, f)

    return X, y
