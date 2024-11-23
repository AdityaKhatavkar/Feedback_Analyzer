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

        #Remove html tags
        pattern = re.compile('<.*?>')
        text =  pattern.sub(r'', text)
    
        #Remove urls
        #text = re.sub(r'https?://\S+|www\.\S+', '', text)
        temp = re.compile(r'https?://\S+|www\.\S+')
        text =  temp.sub('', text)

        #Lowering the text
        text = text.lower()

        #Removing punctions
        '''
        exclude = string.punctuation
        text =  text.translate(str.maketrans('','',exclude))
        '''
        text =  text.translate(str.maketrans('','',string.punctuation))

        #Tokanizing text
        text = word_tokenize(text)

        #Removinng stopwords
        stopwords_to_remove = stopwords.words('english')
        text = [word for word in text if word not in stopwords_to_remove]
        '''
        for w in text.split():
            if w in stopwords_to_remove:
                text = ''.join(text.replace(w, ''))
        '''

        #Lemmatization
        lemmatizer = WordNetLemmatizer()
        text = ' '.join([lemmatizer.lemmatize(word) for word in text])

        return text

# Load the dataset and preprocess it
def data_preprocessing(file_path):
    
    try:
        dataset = pd.read_excel(file_path)
        print("File loaded successfully")
    except Exception as e:
        print(f"Error occurred: {e}")

    batch_size = 10000
    results = []

    for i in range(0, len(dataset['Summary']), batch_size):
        batch = dataset['Summary'].iloc[i:i+batch_size].apply(text_preprocessing)
        results.append(batch)

    dataset['Summary'] = pd.concat(results)

    # Define a pipeline for vectorization
    pipeline = Pipeline([
        ('vectorizer', TfidfVectorizer(max_features=20000)),
    ])

    X = pipeline.fit_transform(dataset['Summary'])
    y = dataset['Sentiment']

    # Encode the labels
    le = LabelEncoder()
    y = le.fit_transform(y)

    # Save the label encoder
    with open('artifacts/label_encoder.pkl', 'wb') as f:
        pickle.dump(le, f)
    
   

    # Save the preprocessing pipeline
    os.makedirs('artifacts', exist_ok=True)
    with open('artifacts/preprocessing.pkl', 'wb') as f:
        pickle.dump(pipeline, f)

    return X, y
