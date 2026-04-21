export function readHttpErrorMessage(response: Response): Promise<string> {
    return response
        .json()
        .then((body) => {
            if (body && typeof body === 'object' && 'message' in body) {
                const message = (body as { message?: unknown }).message;
                if (typeof message === 'string' && message.trim()) return message;
            }
            return `Request failed (${response.status}).`;
        })
        .catch(() => `Request failed (${response.status}).`);
}