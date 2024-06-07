export async function subscribeToAgenda(userId: number, agendaId: number) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BACKEND_URL}/agenda/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, agendaId }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error subscribing to agenda:', error);
      return null;
    }
  }
  