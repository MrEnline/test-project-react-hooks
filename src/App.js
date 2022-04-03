import {Component, useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

// class Slider extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     componentDidMount() {
//         document.title = `Slide: ${this.state.slide}`;
//     }

//     componentDidUpdate() {
//         document.title = `Slide: ${this.state.slide}`;
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }


// const calcValue = () => {
//     console.log("random");

//     return Math.random() * (50 - 1) + 1;
// }

// const getSomeImages = () => {
//     console.log("Fetching");
//     return [
//         "https://www.planetware.com/wpimages/2022/02/france-paris-top-tourist-attractions-eiffel-tower-view.jpg",
//         "https://www.planetware.com/wpimages/2021/02/france-paris-top-attractions-avenue-champs-elysees.jpg"
//     ]
// }

const countTotal = (num) => {
    console.log("Counting...");
    return num + 10;
}

const Slider = (props) => {

    const [slide, setSlide] = useState(0);
    //const [slide, setSlide] = useState(calcValue);//calcValue вызовется один раз и при последующих рендерах не будет вызываться
    //const [slide, setSlide] = useState(() => calcValue());//calcValue вызовется один раз и при последующих рендерах не будет вызываться
    //const [slide, setSlide] = useState(calcValue());//calcValue будет вызываться при каждом рендере. Так делать не стоит. Жрет ресурсы
    const [autoplay, setAutoplay] = useState(false);

    //хук useEffect - можно создавать столько сколько следует для работы
    //useEffect принимает колбэк-функцию, которая вызывается при создании или обновлении компонента
    //[slide, ...] - массив зависимостей(по умолчанию можно не указывать). Массив параметров при изменении которых вызывается useEffect
    //если его не задать, то будет выполняться useEffect при каждом рендере
    //если [] будет пустой, то он useEffect вызовется один раз при первом рендере(действие аналогичное componentDidMount)
    // useEffect(() => {
    //     console.log("effect");
    //     document.title = `Slide: ${slide}`;

    //     window.addEventListener("click", logging);

    //     //выполняет функцию типа ComponentDidUnmount - возвращает и выполняет функцию при уничтожении компонента Slider
    //     //происходит сброс эффекта
    //     //Если ваш эффект возвращает функцию, React выполнит её только тогда, когда наступит время сбросить эффект
    //     return () => {
    //         window.removeEventListener("click", logging);
    //     }

    // }, [slide])

    // useEffect(() => {
    //     console.log("autoplay");
    // }, [autoplay])

    function logging() {
        console.log("log");
    }

   //для мемоизации функции и вызова ее столько раз, сколько нам надо, а не при каждом рендер
    //следует использовать хук useCallback и компонент, в который эта функция передается
    //см. в какой компонент передается в качестве пропса getSomeImages в данном примере
    const getSomeImages = useCallback(() => {
        console.log("fetching");
        return [
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
            "https://www.planetware.com/wpimages/2022/02/france-paris-top-tourist-attractions-eiffel-tower-view.jpg",
            "https://www.planetware.com/wpimages/2021/02/france-paris-top-attractions-avenue-champs-elysees.jpg"
        ]
    }, [])

    //для асинхронной установки состояния и работы с предыдущим значение следует
    //также использовать колбэк как в примере ниже
    function changeSlide(i) {
        //setSlide(slide + i);
        setSlide(slide => slide + i);
    }

    function toggleAutoplay() {
        //setAutoplay(!autoplay);
        setAutoplay(autoplay => !autoplay);
    }

    //второй вариант использования useState - более сложный. Используется реже
    // const [state, setState] = useState({slide: 0, autoplay: false})
    // function changeSlide(i) {
    //     setSlide(state => ({...state, slide: state.slide + i}));  //приходится разбивать, чтобы не пропал autoplay
    // }

    // function toggleAutoplay() {
    //     setAutoplay(state => ({...state, autoplay: !autoplay})); //приходится разбивать, чтобы не пропал slide
    // }

    //если сделать так, то будет вызывать каждый раз при рендеринге
    //чтобы вызывалось при изменении какого-либо состояния, следует использовать хук useMemo
    //как на примере ниже
    //const total = countTotal(slide);




    //useMemo - запоминает последнее значение
    //в данном случае будет вызывать только при изменении slide
    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide])

    //при каждом рендере создается новый объект(ссылка на объект) и следовательно будет вызываться useEffect ниже
    //т.к. он отслеживает состояние style
    //но мы хотим, чтобы style менялся и вызывался только когда изменится slide
    // const style = {
    //     color: slide > 4 ? 'red' : 'black'
    // }

    //решение проблемы выше - использование хука useMemo
    //он не будет вызываться, пока не изменяется slide, а следовательно не будет вызывать и 
    //useEffect ниже, который зависит от изменения style
    const style = useMemo(() => ({
            color: slide > 4 ? 'red' : 'black'
        }), [slide])

    useEffect(() => {
        console.log('styles')
    }, [style])



    return (
        <Container>
            <div className="slider w-50 m-auto">

                <Slide getSomeImages={getSomeImages}/>

                <div className="text-center mt-5">Active slide {slide} <br/> 
                    {autoplay ? 'auto' : null}
                </div>
                <div style={style} className="text-center mt-5">Total slide {total}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

//в качестве пропса getSomeImages передадим функции getSomeImages
const Slide = ({getSomeImages}) => {
    
    const [images, setImages] = useState([]);   //состояние images будет массивом

    //useEffect будет вызываться только при изменении данных полученных в функции getSomeImages
    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
        </>
    )

}


function App() {

    const [slider, setSlider] = useState(true);

    return (
            <>
                <button onClick={() => setSlider(false)}>click</button>
                {slider ? <Slider/> : null}
            </>
  );
}

export default App;
