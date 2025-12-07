import useStore from '@stores/useStore';

function App() {
    const { count, increase, decrease } = useStore();
    return (
        <div>
            Hello World{count} <br />
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    )
}

export default App
