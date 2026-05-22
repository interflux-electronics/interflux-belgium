export function getJson(response: Response): any {
    const status = response.status;

    if (status !== 200 && status !== 201) {
      throw new Error('Fetch failed');
    }

    return response.json();
  };