import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import Purchases, { PurchasesStoreProduct } from 'react-native-purchases';
import { useState, useEffect } from 'react';

export default function BillingModalScreen() {
  const [products, setProducts] = useState<PurchasesStoreProduct[]>([]);

  useEffect(() => {
    Purchases.getProducts(
      ['Pro']
    ).then((products) => {
      setProducts(products);
    });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      console.log(products);
    } else {
      console.log('No products found');
    }
  }, [products]);

  return (
    <View style={{ 
      flex: 1,
      justifyContent: 'flex-end',
      position: 'absolute', 
      backgroundColor: 'transparent', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    }}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View style={{ 
        width: '100%',
        height: '60%',
        alignItems: 'center',
        backgroundColor: '#455A64',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}>

      </View>
  </View>
  );
}
