export interface Size {
    width: number | undefined;
    height: number | undefined;
}

export interface FaceProp {
    size: Size
    input: React.RefObject<HTMLVideoElement>
}