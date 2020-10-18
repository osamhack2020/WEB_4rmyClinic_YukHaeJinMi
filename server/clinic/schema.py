import graphene
import gql.query
import gql.mutation
import gql.subscription

class Query(gql.query.Query, graphene.ObjectType):
	pass

class Mutation(gql.mutation.Mutation, graphene.ObjectType):
	pass

class Subscription(gql.subscription.Subscription, graphene.ObjectType):
	pass

schema=graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)