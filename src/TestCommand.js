//@flow
import PromiseErrorHandler from './request/PromiseErrorHandler';
import Loader from './request/Loader';
import Console from './request/Console';

export default function TestCommand(command: Function): Promise<> {
    Loader.start(`Running test command`);
    return command()
        .then((data) => {
            Loader.stop();
            // Console.success(`Nothing broke`);
            console.log(data);
        })
        .catch(PromiseErrorHandler);
}

