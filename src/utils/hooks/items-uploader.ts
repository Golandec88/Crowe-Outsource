import { useSelector } from "react-redux";
import { useEffect } from "react";
import useDispatcher from "@hooks/dispatcher";
import { IRootState } from "@store/types";

export default function<T, A, I>(
    parent: string,
    field: string,
    loadingField: string,
    creator: (action?: A) => void,
    params?: T
): [{items: I, loading: boolean}, () => void] {
    const dispatch = useDispatcher(creator, params);
    const items = useSelector((state: IRootState) => state[parent][field]);
    const loading: boolean = useSelector(({ global }: IRootState) => global.loadingFields[loadingField]);

    useEffect(() => {
      dispatch();
    }, []);

    return [{ items, loading }, () => dispatch()];
};
