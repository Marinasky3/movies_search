import React from "react"


type Props = {
    onClickHandler: (e: React.MouseEvent<HTMLButtonElement> ) => void
}


export const Button: React.FC<Props> = ({onClickHandler, children}) => {

    return(
        <button    
            onClick={onClickHandler} 
            type="button">
            {children}
        </button>
    )
}