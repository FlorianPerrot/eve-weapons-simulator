import {ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "@/libs/Utils";
import ChoiceStyles from "@/components/EveComponents/EveTypeChoice.module.css";
import TypeListSelector from "@/components/EveComponents/TypeListSelector";
import EveApiLocal from "@/libs/clients/EveApiLocal";
import {DogmaAttribute, EveType} from "@/libs/EveApiEntities";

export default function EveTypeChoice({route, dogmas, placeholder, onEveTypeChoice}: {route: string; dogmas?: DogmaAttribute[]; placeholder: string; onEveTypeChoice: (type: EveType) => void}) {
    const [typeSearch, setTypeSearch] = useState<EveType[]>([])
    const [eveType, setEveType] = useState<EveType>()
    const [text, setText] = useState('')
    const [hideList, setHideList] = useState(false)
    const searchInProgress = useRef(false)

    const runSearch = (text: string) => {
        if (text === '') return
        const eveApi = new EveApiLocal()
        eveApi.search(text, route, dogmas)
            .then(types => {
                setTypeSearch(Object.values(types))
                searchInProgress.current = false
            })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const runSearchDebounce = useCallback(debounce(runSearch, 1000),  [route, dogmas])

    const onSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.currentTarget

        searchInProgress.current = true
        setText(target.value)
    }

    const onEveTypeSelected: (type: EveType) => void = (t: EveType) => {
        if (window.innerWidth < 1024) {
            setHideList(true)
        }

        setEveType(t)
        onEveTypeChoice(t)
    }

    const toggleHideSelectType: MouseEventHandler = (event) => {
        if (!searchInProgress.current) {
            if (event.type == 'click') setHideList(false)
            else setHideList( event.type !== 'mouseenter')
        }
    }

    useEffect(() => {
        runSearchDebounce(text)
    }, [runSearchDebounce, text]);

    return (
        <div className={ChoiceStyles.wrapper} onMouseLeave={toggleHideSelectType} onMouseEnter={toggleHideSelectType}>
            <div className={ChoiceStyles.search}>
                <input placeholder={placeholder} className={ChoiceStyles.input} type='text' value={text} onClick={toggleHideSelectType} onChange={onSearch}/>
            </div>
            <TypeListSelector eveTypesList={hideList ? [] : typeSearch} eveTypeSelected={eveType} onEveTypeSelected={onEveTypeSelected}/>
        </div>
    )
}
