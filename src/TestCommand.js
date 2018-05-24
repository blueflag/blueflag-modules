//@flow
import PromiseErrorHandler from './request/PromiseErrorHandler';
import Loader from './request/Loader';

export default function TestCommand(command: Function): Promise<any> {
    Loader.start(`Running test command`);
    return command()
        .then((data: any) => {
            Loader.stop();
            console.log(data);
        })
        .catch(PromiseErrorHandler);
}

