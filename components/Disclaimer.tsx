import { ReactNode } from "react";

interface DisclaimerProps {
    children: ReactNode;
}

const Disclaimer: React.FC<DisclaimerProps> = ({children}) => {
    return (
        <div className="fixed inset-0 mx-auto overflow-hidden flex justify-center items-center flex-col w-full max-w-2xl font-mono text-white">
            <div className="relative overflow-y-auto custom-scroll bg-[#c47b1b60] min-h-96 m-4 p-4 rounded-2xl custom-scroll">
                <h2 className="text-2xl font-extrabold text-center mx-auto mb-4">Disclaimer</h2>
                <ul className="space-y-4">
                    <li className="flex items-start">
                        <span className="mr-2 text-green-500">
                            &#10003;
                        </span> This app allows users to create ERC-20 tokens and enable swapping or trading without the need to initialize liquidity. Users only need to set an initial price for their tokens, and trading can begin immediately.
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2 text-green-500">
                            &#10003;
                        </span> The app is free to use for token creation, but token creators can set a royalty percentage. These royalties accumulate over time and can be withdrawn at the creator’s discretion.
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2 text-green-500">
                            &#10003;
                        </span> Upon royalty withdrawal, 25% of the fees go to the token creator, while 75% is retained by the app for operational and maintenance purposes.
                    </li>
                </ul>
                <p className="font-bold mt-4">
                    By using this app, you acknowledge and accept that the app only facilitates token creation and trading. You are solely responsible for ensuring compliance with all applicable laws and regulations, and the app is not liable for any financial losses, regulatory issues, or misuse of created tokens.
                </p>
                {children}
            </div>
        </div>
    )
}

export default Disclaimer;