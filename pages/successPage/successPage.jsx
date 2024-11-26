import { useRouter } from "next/router";

export default function SuccessPage() {
    const router = useRouter();
    const { transactionId, amount } = router.query;

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Payment Successful!</h1>
            {transactionId && amount ? (
                <>
                    <p>Transaction ID: {transactionId}</p>
                    <p>Amount Paid: {amount} BDT</p>
                    <p>Thank you for your payment!</p>
                </>
            ) : (
                <p>Loading payment details...</p>
            )}
        </div>
    );
}
