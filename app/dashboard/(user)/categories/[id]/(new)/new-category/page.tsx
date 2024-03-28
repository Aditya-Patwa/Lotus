export default function NewCategory({ params }: { params: { id: string } }) {
    return (
        <h1>
            Creating New Category <br />
            Under category of Id: {params.id}
        </h1>
    );
}