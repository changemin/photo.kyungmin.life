import PhotoData from '../data/PhotoData.json'
import styled from 'styled-components'
import { Desktop } from './mediaQuery';
import ModalImage from 'react-modal-image';

// const images = require.context('../photos', true);
export default function PhotoGridView() {

    return (
        <PhotoGridViewWrapper>
            {PhotoData.map((item) => (
                <PhotoContainer>
                    <PhotoDescriptionContainer>
                        <PhotoDescription>{item.Title}</PhotoDescription>
                        <Desktop>
                            <PhotoDescription>{item.DateTime}</PhotoDescription>
                        </Desktop>
                    </PhotoDescriptionContainer>
                        <Photo
                            small={"photos/"+item.FilePath}
                            large={"photos/"+item.FilePath}
                            alt={item.Location.StringLocation == "" ? (item.Idx)+"번째 시선: "+item.Title : item.Location.StringLocation+"에서 찾은 "+(item.Idx)+"번째 시선: "+item.Title}
                            hideDownload={true}
                        />
                </PhotoContainer>
             ))}
        </PhotoGridViewWrapper>
    )
}

const PhotoContainer = styled.div`
    position: relative;
    width: 32vw;
    height: 32vw;
    @media screen and (min-width: 768px){
        width: 20vw;
        height: 20vw;
    }
    /* margin: 1%; */
`

const PhotoDescriptionContainer = styled.div`
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: end;
    
    pointer-events: none;
    /* transform: translate(-50%, -50%); */
`

const PhotoDescription = styled.p`  
    text-align: right;
    width: max-content;
    margin:0;
    padding: 0;

    font-family: 'Courier New', monospace;
    letter-spacing: 0.em;
    background-color: black;
    color: white;

`

const Photo = styled(ModalImage)`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0;
`

const PhotoGridViewWrapper = styled.div`
    display: flex;
    column-gap: 1vw;
    row-gap: 1vw;
    flex-wrap: wrap;
    justify-content:flex-start;
    align-items: flex-start;
    position: absolute;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 3vh;
    top: 8vh;
    width: 100vw;
    
    @media screen and (min-width: 768px){
        width: 84vw;
        top: 3vh;
        padding-left:8vw;
        padding-right:8vw;
    }
    /* background-color: red; */
`
