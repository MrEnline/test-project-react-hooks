import { useEffect } from 'react';
import {Component, useState} from 'react';
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

const Slider = (props) => {

    const [slide, setSlide] = useState(0);
    //const [slide, setSlide] = useState(calcValue);//calcValue вызовется один раз и при последующих рендерах не будет вызываться
    //const [slide, setSlide] = useState(() => calcValue());//calcValue вызовется один раз и при последующих рендерах не будет вызываться
    //const [slide, setSlide] = useState(calcValue());//calcValue будет вызываться при каждом рендере. Так делать не стоит. Жрет ресурсы
    const [autoplay, setAutoplay] = useState(false);

    //хук useEffect - можно создавать столько сколько следует для работы
    //[slide, ...] - массив зависимостей(по умолчанию можно не указывать). Массив параметров при изменении которых вызывается useEffect
    //если его не задать, то будет выполняться useEffect при каждом рендере
    //если [] будет пустой, то он useEffect вызовется один раз при первом рендере(действие аналогичное componentDidMount)
    useEffect(() => {
        console.log("effect");
        document.title = `Slide: ${slide}`;

        window.addEventListener("click", logging);

        //выполняет функцию типа ComponentDidUnmount - возвращает функцию при уничтожении компонента Slider
        return () => {
            window.removeEventListener("click", logging);
        }

    }, [slide])

    useEffect(() => {
        console.log("autoplay");
    }, [autoplay])

    function logging() {
        console.log("log");
    }

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

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {slide} <br/> 
                    {autoplay ? 'auto' : null}
                </div>
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
