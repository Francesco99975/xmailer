interface Symptoms {
    fever: boolean;
    breath: boolean;
    cough: boolean;
    throat: boolean;
    nose: boolean;
    taste: boolean;
    nausea: boolean;
    tiredness: boolean;
}


export interface CovidForm {
    firstName: string,
    middleName: string
    lastName: string,
    symptoms: Symptoms,
    travel: boolean,
    contact: boolean,
    hasMiddle: boolean,
    passed: boolean
}