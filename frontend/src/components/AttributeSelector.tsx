import { PetInfo } from "@/types"
import { useEffect, useState } from "react"
import { Dispatch, SetStateAction } from "react";

export default function AttributeSelector(props : {
    attributeNameLable: string,
    attributeNameActual: string,
    allPets: Array<PetInfo>,
    possiblePets: Array<PetInfo>,
    setSelected: Dispatch<Array<string>>
}) {

    const [attributeSwitches, setAttributeSwitches] = useState<Array<boolean>>();
    const [attributeOptions, setAttributeOptions] = useState<Array<string>>();
    const [checkedOptions, setCheckedOptions] = useState<Array<string>>([]);

    // When the props change
    useEffect(() => {

        // Deconstruct properties
        let attributeName : string = props.attributeNameActual;
        let allPets = props.allPets;
        let possiblePets = props.possiblePets;

        // Get all options
        let allOptions : Array<any> = [];
        for (let i = 0; i < allPets.length; ++i) {
            let currentPet = allPets[i];
            let currentPetAttribute = currentPet[attributeName as keyof PetInfo];
            if (!allOptions.includes(currentPetAttribute)) {
                allOptions.push(currentPetAttribute);
            }
        }
        setAttributeOptions(allOptions as Array<string>);

        // Get all possible options
        let allPossibleOptions : Array<any> = [];
        for (let i = 0; i < possiblePets.length; ++i) {
            let currentPet = possiblePets[i];
            let currentPetAttribute = currentPet[attributeName as keyof PetInfo];
            if (!allPossibleOptions.includes(currentPetAttribute)) {
                allPossibleOptions.push(currentPetAttribute);
            }
        }

        // Create display rule
        let enabledOptions : Array<boolean> = [];
        for (let i = 0; i < allOptions.length; ++i) {
            let currentOption = allOptions[i];
            enabledOptions.push(allPossibleOptions.includes(currentOption));
        }
        setAttributeSwitches(enabledOptions)

    }, [props.possiblePets])

    // When the user checks or unchecks a box
    useEffect(() => {
        props.setSelected(checkedOptions)
    }, [checkedOptions])

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {

        let newSelection : Array<string> = []
        if (event.target.checked) {
            setCheckedOptions([...newSelection, event.target.name]);
        }
        else {
            for (let i = 0; i < checkedOptions.length; ++i) {
                if (checkedOptions[i] != event.target.name) {
                    newSelection.push(checkedOptions[i]);
                }
            }
            setCheckedOptions(newSelection);
        }
    }

    if (attributeOptions && attributeSwitches) {
        return(
            <div>
                <p className="text-xl font-bold">{props.attributeNameLable}</p>
                <div className="ml-5">
                { attributeOptions.map((input : string, idx : number) => (
                    <div key={idx}>
                        <div className="flex flex-row">
                            <input className="mr-3" name={input} type="checkbox" onChange={handleChange} disabled={!attributeSwitches[idx]}/>
                            <p>{input}</p>
                        </div>
                    </div>
                )) }
                </div>
            </div>
        )
    }

    return null;

}