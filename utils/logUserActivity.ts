export const logUserActivity = async (activity: any) => {
    try {
      const response = await fetch('/api/logUserActivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity }),
      });

      if (response.ok) {
        console.log('Activity logged successfully');
      } else {
        console.error('Error logging activity:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };