/******************************************************************************

Welcome to GDB Online.
GDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,
C#, OCaml, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.
Code, Compile, Run and Debug online from anywhere in world.

*******************************************************************************/
#include <iostream>

using namespace std;
 class node{
   
   public:
   int value;
   node* nxt;
    node(int val){
         value=val;
         nxt = nullptr;
        
     }
 };
void removeDuplicate(node* head){
    node* p1= head;
    node* p2= head->nxt;
    while(p2!=nullptr){
        while(p2!=nullptr and p1->value==p2->value){
            p2=p2->nxt;
        }
        p1->nxt=p2;
        p1=p2;
        p2=p1->nxt;
    }
    return;
}
int main()
{
    int n;
    cin>>n;
    node* head=nullptr;
    node* tmp;
    for(int i=0;i<n;i++)
    {
        int t;
        cout<<"Enter the number: ";
        cin>>t;
        if(head==nullptr){
            head = new node(t);
            head->nxt=nullptr;
            tmp=head;
        }
        else{
            node* x = new node(t);
            tmp->nxt=x;
            tmp=x;
        }
    }
    tmp=head;
    while(tmp!=nullptr){
        cout<<tmp->value<<" ";
        tmp=tmp->nxt;
    }
    // removeDuplicate(head);
    node* p1= head;
    node* p2= head->nxt;
    while(p2!=nullptr){
        while(p2!=nullptr and p1->value==p2->value){
            p2=p2->nxt;
        }
        p1->nxt=p2;
        p1=p2;
        p2=p1->nxt;
    }
    tmp=head;
    while(tmp!=nullptr){
        cout<<tmp->value<<" ";
        tmp=tmp->nxt;
    }
    return 0;
}