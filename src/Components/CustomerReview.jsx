
function CustomerReview({scaleValue, reviewType}){
    const range =[1, 2, 3, 4, 5]
    const scaleType = reviewType === 'confort' ? '😌': '💖'

    return(
        <div>
            <span>{reviewType} : </span>
            <div style={{display: 'inline'}}>
                {range.map((rangeElem) =>
                    scaleValue >= rangeElem ? (
                        <span key={rangeElem.toString()}>{scaleType}</span>
                    ) : null
                )}
            </div>
        </div>
    )
}

export default CustomerReview;