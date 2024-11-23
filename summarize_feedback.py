import sys
import json
from ml.text_summarization.summarization import summarize_text

def summarize_feedback(feedbacks):
    summary = {
        "sentence":'siddesh'
    }
  
    # Categorize feedback into good or bad summaries
    to_summarize = " ".join(feedback.get('feedback', '') for feedback in feedbacks) 
    summary['sentence'] = summarize_text(to_summarize)

    return summary

if __name__ == "__main__":
    try:
        # Read feedbacks from stdin
        input_data = sys.stdin.read()
        feedbacks = json.loads(input_data)

        # Summarize the feedback
        result = summarize_feedback(feedbacks)

        # Output result as JSON
        print(json.dumps(result))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
