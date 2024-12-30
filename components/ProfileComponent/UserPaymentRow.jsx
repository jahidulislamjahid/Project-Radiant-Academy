
const UserPaymentRow = ({ payment }) => {

    const ammount = Math.ceil( parseInt(payment?.store_amount)  + (parseInt(payment?.store_amount) * 0.025));

    const formateDate = (date) => {
        if (!date) return ''; 
        const parsedDate = new Date(date); 
        if (isNaN(parsedDate)) return 'Invalid Date'; 
        const dateOption = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        };
        return new Intl.DateTimeFormat('es-US', dateOption).format(parsedDate).replace(',', '');
    };

    const transDate = formateDate(payment?.tran_date);
    return (
        <tr className="mt-1 ">

            <td className='dark:bg-slate-600 bg-slate-200 ' >
                {payment?.tran_id}
            </td>
            <td className='dark:bg-slate-600  bg-slate-200'>
                <div className="flex items-center gap-1">

                    <div>
                        {payment?.status}
                    </div>
                </div>
            </td>

            <td className='dark:bg-slate-600  bg-slate-200'><span className="font-semibold">৳</span> {ammount}</td>
            <td className='dark:bg-slate-600  bg-slate-200'>{payment?.purchaseCourse.length}</td>
            <td className='dark:bg-slate-600  bg-slate-200'>{payment?.card_brand}</td>
            <td className='dark:bg-slate-600  bg-slate-200'>{transDate}
            </td>


        </tr>
    );
};

export default UserPaymentRow;