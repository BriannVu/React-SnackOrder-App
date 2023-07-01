import { Link } from 'react-router-dom';
import classes from './MealsSummary.module.css'

const MealsSummary = () =>{
    return <section className={classes.summary}>
        <h2>Delectable Snacks, Delivered Straight to You!</h2>
        <p>
        Pick your preferred snack from our extensive range of options and relish a scrumptious treat wherever you may be.
        </p>
        <p>
        Every snack we offer is crafted using premium ingredients, prepared right when you need it, and of course, made by skilled snack artisans!
        </p>
        <Link to='/admin' className={classes.a} >Admin Login</Link>
    </section>
};

export default MealsSummary;