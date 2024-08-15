export const logisticsOperators = [
{
  static_logistics_operator_id: "66bd2efea8605f7ec0add482",
  cost_divider: 6000,
  name: "Operador Logístico 1",
  distance_rules: [
      {
        distance: {
        max: 100
        },
        distance_multiple: 1.2,
        estimated_time_of_arrival: 1
      },
      {
        distance: {
          min: 100,
          max: 500
        },
        distance_multiple: 1.6,
        estimated_time_of_arrival: 3
      },
      {
        distance: {
          min: 500
        },
        distance_multiple: 5,
        estimated_time_of_arrival: 4
      }
    ]
},
{
  static_logistics_operator_id: "66bd2f07dbdc5324f2bfd9bf",
  cost_divider: 5000,
  name: "Operador Logístico 2",
  distance_rules: [
    {
      distance: {
        max: 100
      },
      distance_multiple: 1,
      estimated_time_of_arrival: 1
    },
    {
      distance: {
        min: 100,
        max: 500
      },
      distance_multiple: 1.8,
      estimated_time_of_arrival: 2
    },
    {
      distance: {
        min: 500
      },
      distance_multiple: 4,
      estimated_time_of_arrival: 5
    }
  ]
}
]
