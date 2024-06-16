import {ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "@/libs/Utils";
import ChoiceStyles from "@/components/Choice.module.css";
import TypeListSelector from "@/components/TypeListSelector";
import EveApiLocal from "@/libs/clients/EveApiLocal";
import {DogmaAttribute, EveType} from "@/libs/EveApiEntities";

export default function Choice({route, dogmas, placeholder, onEveTypeChoice}: {route: string; dogmas?: DogmaAttribute[]; placeholder: string; onEveTypeChoice: (type: EveType) => void}) {
    const [typeSearch, setTypeSearch] = useState<EveType[]>([])
    const [eveType, setEveType] = useState<EveType>()
    const [text, setText] = useState('')
    const [hideList, setHideList] = useState(false)
    const searchInProgress = useRef(false)

    const eveApi = new EveApiLocal()

    const runSearch = useCallback(debounce((text: string, dogmas?: DogmaAttribute[]) => {
        if (text === '') return
        eveApi.search(text, route, dogmas)
            .then(types => {
                setTypeSearch(Object.values(types))
                searchInProgress.current = false
            })
    }, 1000), [route])

    useEffect(() => {
        runSearch(text, dogmas)
    }, [runSearch, text, dogmas]);

    const onSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.currentTarget
        const searchText = target.value

        searchInProgress.current = true
        runSearch(searchText)
        setText(searchText)
    }

    const onEveTypeSelected: (type: EveType) => void = (t: EveType) => {
        if (window.innerWidth < 1024) {
            console.log(hideList)
            setHideList(true)
        }

        setEveType(t)
        onEveTypeChoice(t)
    }

    const toggleHideSelectType: MouseEventHandler = (event) => {

        console.log(hideList)
        if (!searchInProgress.current) {
            if (event.type == 'click') setHideList(false)
            else setHideList( event.type !== 'mouseenter')
        }
    }

    return (
        <div className={ChoiceStyles.wrapper} onMouseLeave={toggleHideSelectType} onMouseEnter={toggleHideSelectType}>
            <div className={ChoiceStyles.search}>
                <input placeholder={placeholder} className={ChoiceStyles.input} type='text' value={text} onClick={toggleHideSelectType} onChange={onSearch}/>
            </div>
            <TypeListSelector eveTypesList={hideList ? [] : typeSearch} eveTypeSelected={eveType} onEveTypeSelected={onEveTypeSelected}/>
        </div>
    )
}
