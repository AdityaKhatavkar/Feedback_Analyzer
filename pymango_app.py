import pymongo
import pickle
import logging
from ml.text_classification.components.data_transformation import text_preprocessing
from ml.text_summarization.summarization import summarize_text

# Logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# MongoDB Atlas connection string (use as is)
client = pymongo.MongoClient("mongodb+srv://siddhesh112004:Siddesh$112004@cluster0.ze1s3.mongodb.net")
db = client['Feedback_Analyzer']
feedback_collection = db['feedbacks']
summary_collection = db['summaries']

# Load the classification model and preprocessing pipeline
try:
    with open("artifacts/model.pkl", "rb") as model_file:
        classification_model_pkl = pickle.load(model_file)
    with open("artifacts/preprocessing.pkl", "rb") as preprocessing_file:
        preprocessing_pipeline = pickle.load(preprocessing_file)
except FileNotFoundError:
    raise Exception("Model or preprocessing files are missing in the 'artifacts' folder")

def classify_feedback(feedback):
    """Classify feedback into positive, negative, or other."""
    processed_feedback = preprocessing_pipeline.transform([feedback])
    result = classification_model_pkl.predict(processed_feedback)
    return result[0]

def summarize_feedback(feedback_list):
    """Summarize the feedback list."""
    if not feedback_list:
        return "No feedback available to summarize."
    combined_feedback = " ".join(feedback_list)
    combined_feedback = combined_feedback[:1000]  # Truncate to avoid exceeding model input limits
    return summarize_text(combined_feedback)

def analyze_feedback():
    try:
        feedback_data = feedback_collection.find()
       
        positive_feedback, negative_feedback, other_feedback = [], [], []
        client_id = feedback_data[0].get('clientid', '')
        for feedback in feedback_data:
            feedback_text = feedback.get('feedback', '')
            if not feedback_text:
                continue

            sentiment = classify_feedback(feedback_text)
            if sentiment == 'positive':
                positive_feedback.append(feedback_text)
            elif sentiment == 'negative':
                negative_feedback.append(feedback_text)
            else:
                other_feedback.append(feedback_text)

            feedback_collection.update_one(
                {"_id": feedback['_id']},
                {"$set": {"catagry": sentiment}}
            )

        positive_summary = summarize_feedback(positive_feedback)
        negative_summary = summarize_feedback(negative_feedback)
        other_summary = summarize_feedback(other_feedback)

        summary_collection.insert_one({
            "clientid": client_id,
            "goodsummary": positive_summary,
            "badsummary": negative_summary,
            "neutralsummary": other_summary
        })
        summary_collection.update_one(
        {"clientid": client_id},  # Filter: Match the document by clientid
        {
         "$set": {  # Update the fields
                "goodsummary": positive_summary,
                "badsummary": negative_summary,
                "neutralsummary": other_summary
            }
        },
        upsert=True  # Insert if no matching document is found
        )

        logging.info("Feedback analysis and summarization completed successfully.")
    except Exception as e:
        logging.error(f"An error occurred during feedback analysis: {e}")

if __name__ == "__main__":
    analyze_feedback()