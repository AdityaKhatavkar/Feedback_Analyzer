from ml.text_classification.components.data_transformation import text_preprocessing
import pickle

def classify_text(feedback):
    # Preprocess the input text

    try:
        with open("artifacts/model.pkl", "rb") as model_file:
            classification_model_pkl = pickle.load(model_file)
        with open("artifacts/preprocessing.pkl", "rb") as preprocessing_file:
            preprocessing_pipeline = pickle.load(preprocessing_file)
    except FileNotFoundError:
        raise Exception("Model or preprocessing files are missing in the 'artifacts' folder")

    processed_feedback = preprocessing_pipeline.transform([feedback])
    result = classification_model_pkl.predict(processed_feedback)

    if result[0] == 1:
        return True
    else :
        return False
