export async function errorHandler(): Promise<void> {
    throw new Error('PAGE_NOT_FOUND');
}
