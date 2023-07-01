import React, { useEffect, useState } from 'react'
import './PlansScreen.css'
import { db } from './firebase';
import { collection, query, where, getDocs, onSnapshot, addDoc, doc } from 'firebase/firestore';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';


function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    //this useeffect is responsible for showing the renewal time and plan purchased by the user
    /* useEffect(() => {
         db.collection("customers")
             .doc(user.uid)
             .collection("subscriptions")
             .get()
             .then((querySnapshot) => {
                 querySnapshot.forEach(async (subscription) => {
                     setSubscription({
                         role: subscription.data().role,
                         current_period_end: subscription.data().current_period_end.seconds,
                         current_period_start: subscription.data().current_period_start
                             .seconds,
                     });
                 });
             });
     }, [user.uid]);*/


    useEffect(() => {
        const loadSubscriptions = async () => {
            const querySnapshot = await getDocs(collection(db, 'customers', user.uid, 'subscriptions'));

            querySnapshot.forEach((subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                });
            });
        };

        loadSubscriptions();
    }, [user.uid]);
    console.log(subscription);

    /*
        const fetchPost = async () => {
            db.collection('products').where('active', '==', true)
                .get().then(querySnapshot => {
                    const products = {};
                    querySnapshot.forEach(async productDoc => {
                        products[productDoc.id] = productDoc.data();
                        const priceSnap = await productDoc.ref.collection("prices").get();
                        priceSnap.docs.forEach(price => {
                            products[productDoc.id].prices = {
                                priceId: price.id,
                                priceData: price.data()
                            };
                        });
     
                    });
                    setProducts(products);
                    console.log(products);
     
                });
        }*/
    const fetchData = async () => {
        const q = query(collection(db, 'products'), where('active', '==', true));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await getDocs(collection(productDoc.ref, 'prices'));
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    };
                });
            });
            setProducts(products);
            console.log(products);
        });

        // Cleanup the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    };


    useEffect(() => {
        fetchData()
    }, [])



    const loadCheckout = async (priceId) => {
        const docRef = await addDoc(collection(db, 'customers', user.uid, 'checkout_sessions'), {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        onSnapshot(docRef, async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                // Show an error to your customer and inspect your cloud function logs in the Firebase console.
                alert(`An error occurred: ${error.message}`);
            }

            if (sessionId) {
                // We have a session, let's redirect to checkout and initialize Stripe.
                const stripe = await loadStripe('pk_test_51NOIcfBq4Ax5gqjAKE1dLOXsv2DEAQlvFYPVzLe22ZFc6SI8dNvE5dNleIioeahglnafsLl2YEMCq4eZizN80XaH00Ww7ponqK');
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };


    /* const loadCheckout = async (priceId) => {
         const docRef = await db.collection('customers').doc(user.uid).collection('checkout_sessions')
             .add({
                 price: priceId,
                 success_url: window.location.origin,
                 cancel_url: window.location.origin,
             });
         docRef.onSnapshot(async (snap) => {
             const { error, sessionId } = snap.data();
             if (error) {
                 //show an error to your customer and
                 //inspect your cloud function logs in the firebase console.
                 alert(`An error occured:${error.message}`)
             }
     
             if (sessionId) {
                 //we have a session, lets redirect to checkout
                 //init stripe
                 
                 const stripe=await loadStripe('pk_test_51NOIcfBq4Ax5gqjAKE1dLOXsv2DEAQlvFYPVzLe22ZFc6SI8dNvE5dNleIioeahglnafsLl2YEMCq4eZizN80XaH00Ww7ponqK')
           
             stripe.redirectToCheckout({sessionId});
         };
         })
     };*/
    return (
        <div className='plansScreen'>
            <br/>
            {subscription &&<p>Renewal date: {new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p> }
           
            {Object.entries(products).map(([productId, productData]) => {
                //TODO:add some logic to check if user subscrption is active...
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)

                return (
                    <div
                        keys={productId} className={`${isCurrentPackage && "plansScreen__plan--disabled"
                            } plansScreen__plan`}>
                                
                        <div className='plansScreen__info'>
                      
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>

                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage ? "Current Package" : "Subscribe"}
                        </button>
                    </div>

                );
            })}
        </div>
    )

}
export default PlansScreen;
