import { SignOutButton } from '../../components/SignOutButton'
import{ Text, View} from 'react-native'
import { SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useTransactions } from '../../hooks/useTransctions'
import PageLoader from '../../components/PageLoader'
import {useEffect} from 'react'
export default function Page() {
  const { user } = useUser()
  const { loadData, deleteTransaction, isLoading, transactions, summary } = useTransactions(user?.id)

  const { session } = useSession()
  
  useEffect(()=> {
    loadData()
  }, [loadData])

  if(isLoading) return <PageLoader/>
  return (
    <View style={styles.container}>
      <Text type="title">Welcome!</Text>
      {/* Show the sign-in and sign-up buttons when the user is signed out */}
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
      {/* Show the sign-out button when the user is signed in */}
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
})