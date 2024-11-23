import sys
import json

def summarize_feedback(feedbacks):
    summary = {
        "good": "",
        "bad": ""
    }

    for feedback_entry in feedbacks:
        feedback_text = feedback_entry.get('feedback', '')

        # Categorize feedback into good or bad summaries
        if "excellent" in feedback_text.lower() or "good" in feedback_text.lower():
            summary["good"] += feedback_text + " "
        elif "poor" in feedback_text.lower() or "bad" in feedback_text.lower():
            summary["bad"] += feedback_text + " "

    # Trim any extra whitespace
    summary["good"] = summary["good"].strip()
    summary["bad"] = summary["bad"].strip()
    
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
