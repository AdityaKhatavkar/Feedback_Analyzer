import sys
import json
from classify import classify_text

def analyze_feedback(feedbacks):
    
    # Example categorization (replace with your ML logic)
    categorized = {
        "positive": [],
        "negative": []
    }

    for feedback_entry in feedbacks:
        # Extract the feedback text
        feedback_text = feedback_entry.get('feedback', '')

        # Categorize based on feedback text
        if classify_text(feedback_text):
            categorized["positive"].append(feedback_entry)
        else:
            categorized["negative"].append(feedback_entry)

    return categorized

if __name__ == "__main__":
    try:
        # Read feedbacks from stdin
        input_data = sys.stdin.read()
        feedbacks = json.loads(input_data)
        result = analyze_feedback(feedbacks)
        
        # Output result as JSON
        print(json.dumps(result))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
