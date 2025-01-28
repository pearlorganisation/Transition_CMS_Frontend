export async function GET() {
    const products = [
        { id: 1, name: 'Laptop', price: 1200 },
        { id: 2, name: 'Phone', price: 800 },
    ];

    return new Response(JSON.stringify(products), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(){
    
}