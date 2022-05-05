import { useEffect } from "react";

type Props = {
    children: JSX.Element
        | JSX.Element[]
        | React.ReactChild
        | React.ReactChild[],
    onEnter: Function,
};

function mainWrapper({ children, onEnter } :Props) {
    useEffect(() => {
      onEnter();
    }, []);
  
    return children;
}

export default mainWrapper;