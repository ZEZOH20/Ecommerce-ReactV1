

type Something = {
    Name:string,
    Description:string,
    Age: number,
}

const Something = (props : Something) => {
    const { Name , Description } = props;
    return (
        <div className={"App-header"}>
            <h1>klsjdf</h1>
            {
            props.Name?.toUpperCase()
           }
        </div>
    )
}
export default Something
