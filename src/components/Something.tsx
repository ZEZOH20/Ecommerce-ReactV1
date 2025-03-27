

type Something = {
    Name:string,
    Description:string,
    Age: number,
}

const Something = ({ Name }: Something) => {

    return (
        <div className={"App-header"}>
            <h1>klsjdf</h1>
            {  Name?.toUpperCase() }
        </div>
    )
}
export default Something
