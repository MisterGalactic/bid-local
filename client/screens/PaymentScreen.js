import React, { useState, useEffect, useCallback} from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { PaymentView } from '../components/PaymentView'
import axios  from 'axios';
import Navbar from '../components/Navbar';

import { GET_USER_INFO, BUY_CREDIT } from '../queries/userInfo';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

export default function PaymentScreen({ navigation, route }) {
  const [refresh, setRefresh] = useState(false);

  const user = useQuery(GET_USER_INFO);
  const [getCredit] = useLazyQuery(GET_USER_INFO, {
    fetchPolicy: 'cache-and-network',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [credit, setCredit] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setID] = useState('');
  const [address, setAddress] = useState({
    firstLineAddress: '',
    secondLineAddress: '',
    city: '',
    postcode: '',
    country: '',
  });

  const [response, setResponse ] = useState()
  const [receipt, setReceipt ] = useState()

  const [ makePayment, setMakePayment ] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')

  const [changeUser] = useMutation(BUY_CREDIT);

  useEffect(() => {
    if (user.data) {
      setEmail(user.data.get_user_info.email);
      setCredit(user.data.get_user_info.credit);
      setPhoneNumber(
        user.data.get_user_info.phoneNumber
          ? user.data.get_user_info.phoneNumber
          : '',
      );
      setFirstName(
        user.data.get_user_info.firstName
          ? user.data.get_user_info.firstName
          : 'not set',
      );
      setLastName(
        user.data.get_user_info.lastName
          ? user.data.get_user_info.lastName
          : 'name',
      );
      setID(user.data.get_user_info.id);
      setAddress(
        user.data.get_user_info.address
          ? {
              firstLineAddress:
                user.data.get_user_info.address.firstLineAddress,
              secondLineAddress:
                user.data.get_user_info.address.secondLineAddress,
              city: user.data.get_user_info.address.city,
              postcode: user.data.get_user_info.address.postcode,
              country: user.data.get_user_info.address.country,
            }
          : {
              firstLineAddress: '',
              secondLineAddress: '',
              city: '',
              postcode: '',
              country: '',
            },
      );
      console.log(user.data.get_user_info)
      return;
    }
  }, [user]);

  const handleRefresh = useCallback(() => {
    setRefresh(true);
    getCredit();
    setRefresh(false);
  }, []);


  const cartInfo = {
      id: '5eruyt35eggr76476236523t3',
      description: 'Credit',
      amount: 100
  }

  const onCheckStatus = async (paymentResponse) => {
      setPaymentStatus('Please wait while confirming your payment!')
      setResponse(paymentResponse)

      let jsonResponse = JSON.parse(paymentResponse);
      // perform operation to check payment status

      try {

          const stripeResponse = await axios.post('http://localhost:8001/payment', {
              email: email.length<= 1 ? 'noemail@gmail.com' : email,
              address: address,
              name: `${firstName} ${lastName}`,
              phone: phoneNumber,
              product: cartInfo,
              authToken: jsonResponse
          })

          if(stripeResponse){

              const { paid } = stripeResponse.data;
              setReceipt(stripeResponse.data.receipt_url)
              if(paid === true){
                  setPaymentStatus('Payment Success')
                  changeUser({
                    variables: {
                      UserId: user.data.get_user_info.id,
                      credit: parseInt(cartInfo.amount),
                    }
                  });
                  setTimeout(() => handleRefresh(), 100)
              }else{
                  setPaymentStatus('Payment failed due to some issue')
              }

          }else{
              setPaymentStatus(' Payment failed due to some issue')
          }


      } catch (error) {

          console.log(error)
          setPaymentStatus(' Payment failed due to some issue')

      }

  }


  const paymentUI = () => {

      if(!makePayment){

          return <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 300, marginTop: 50}}>
                  <Text style={{ fontSize: 25, margin: 10}}> Make Payment </Text>
                  <Text style={{ fontSize: 16, margin: 10}}> Product Description: {cartInfo.description} </Text>
                  <Text style={{ fontSize: 16, margin: 10}}> Payable Amount: {cartInfo.amount} HKD </Text>

                  <TouchableOpacity style={{ height: 60, width: 300, backgroundColor: '#FF5733', borderRadius: 30, justifyContent: 'center', alignItems: 'center'
                      }}
                      onPress={() => {
                          setMakePayment(true)
                      }}
                      >
                      <Text style={{ color: '#FFF', fontSize: 20}}>
                          Proceed To Pay
                      </Text>

                  </TouchableOpacity>


              </View>



          // show to make payment
      }else{

          if(response !== undefined){
              return <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 300, marginTop: 50}}>
                  <Text style={{ fontSize: 25, margin: 10}}> { paymentStatus} </Text>
                  <Text style={{ fontSize: 16, margin: 10}}> { response} </Text>
                  <Text style={{ fontSize: 16, margin: 10}}> { receipt} </Text>
              </View>

          }else{
              return <PaymentView onCheckStatus={onCheckStatus} product={cartInfo.description} amount={cartInfo.amount} />

          }

      }

  }

return (
        <>
          <Navbar navigation={navigation} canGoBack={true}/>
          <View style={styles.container}>
            <Text>Credit: {credit} HKD</Text>
            {paymentUI()}
          </View>
        </>
        )}


const styles = StyleSheet.create({
container: { flex: 1, paddingTop: 100},
navigation: { flex: 2, backgroundColor: 'red' },
body: { flex: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' },
footer: { flex: 1, backgroundColor: 'cyan' }
})

