import  { useState, useMemo } from 'react';

export const useSortData = (items:any, config: any = null) => {


    const [sortConfig, setSortConfig] = useState(config);

    const SortedItems = useMemo(() => {

        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }

                return 0;

            })


        }

        return sortableItems
    }, [items,sortConfig])

    const requestSort= (key:string)=>{

        let direction='asc';
        if(sortConfig&& sortConfig.key===key&&sortConfig.direction==='asc'){
            direction='dsc';
        }
        setSortConfig({key,direction})

    }

    return {items:SortedItems,requestSort,sortConfig}
}